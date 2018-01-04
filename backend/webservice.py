"""-*- coding: utf-8; -*-

(c) 2017 FoF Team

Senior Group Manager: Stuart Wong Sow Long
Architect: Dr. Carlos Toro
Managers: Ruchir Kalra, Jackie Wong Yat Kit

This file is part of the:

ARTC-FoF Maufacturing Intelligence Capture and Processing SDK

The ARTC-FoF SDK is registered software; you cannot redistribute it and/or
modify without express knowledge of ARTC, parts of this software are
distributed WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the LGPL License
for more details.

You should have received a copy of the LGPL License along with this software.
If not, see <http://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html>.

"""

from flask import *
import json
import csv
from datetime import datetime, timedelta
from pprint import pprint
import uuid
import numpy as np

from cassandra.cqlengine import connection
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from ssl import CERT_REQUIRED

from utils import *

app = Flask(__name__)

# Config for cassandra database
config = {
    "cassandra":
        {
            "workers": 1,
            "hosts": ["192.168.129.17", "192.168.129.23"],
            "keyspace": "modelfactory_0",
            "user": "thy",
            "pass": "aiyooquueng3nuaM4Che",
            "ca_certs": "ca.crt"
        }
}
sensor_info_file = './sensor_info.csv'


@app.route("/index")
def index():
    return render_template("main.html", title="Intelligent Machining")

"""
    To get the list of sensors with id
"""


@app.route('/all_sensors', methods=['GET'])
def all_sensors():

    output = {}
    try:
        sensors = []
        with open(sensor_info_file, 'rU') as file:
            rows = csv.reader(file)
            for row in rows:
                sensors.append({
                    'old_name': row[0],
                    'name': row[1],
                    'type': row[2],
                    'opcua_node': row[3],
                    'id': row[4],
                })
            file.close()

        output = {
            'status': 'OK',
            'data': sensors
        }
    except Exception, e:
        output['status'] = 'Error'
        output['message'] = e
    finally:
        pass
    return json.dumps(output)


"""
    To get data by sensor_id, date_time, database_type
"""


@app.route('/data_by_sensor_id/<sensor_id>', methods=['GET'])
def data_by_sensor_id(sensor_id):

    output = {}

    # Parse the date string format yyyyMMddHHmmss
    # Split into [date, time]
    query_date = request.args.get('datetime')
    duration = int(request.args.get('duration', 10))

    # Parameter checkings
    # TODO

    query_date = datetime.strptime(query_date, '%Y%m%d%H%M%S')
    from_time = datetime.strftime(query_date, '%H:%M:%S')

    to_time = datetime.strftime(query_date + timedelta(0, duration),
                                '%H:%M:%S')

    # Get type of data
    data_type = request.args.get('dataType', None)
    if data_type:
        data_type = data_type.split(',')

    # Cassandra db source
    cluster = Cluster(
        contact_points=config['cassandra']['hosts'],
        auth_provider=PlainTextAuthProvider(
            username=config['cassandra']['user'],
            password=config['cassandra']['pass']),
        ssl_options={
            'ca_certs': config['cassandra']['ca_certs'],
            'cert_reqs': CERT_REQUIRED})
    session = cluster.connect(config['cassandra']['keyspace'])

    # Prepare statement
    statement = session.prepare(
        """
        SELECT value FROM reading
        WHERE sensor_id = ?
            AND date = ?
            AND time >= ? AND time <= ?
        """
    )

    # Execute query
    rows = session.execute(
        statement,
        [uuid.UUID(sensor_id),
         query_date.date(), from_time, to_time],
        timeout=20.0  # default is 10s
    )

    # Process data
    data = np.array([r for r in rows])
    data = data.flatten()
    np.asarray(data)

    processed_data = []

    if len(data) > 0:
        # To get PP
        if data_type is None or 'PP' in data_type:
            processed_data.append({
                'type': 'PP',
                'data': np.ptp(data)
            })

        # To get RMS
        if data_type is None or 'RMS' in data_type:
            rms = np.sqrt(np.mean(data ** 2))
            processed_data.append({
                'type': 'RMS',
                'data': rms
            })

        # To get FFT (Still not sure that it is correct )
        if data_type is None or 'FFT' in data_type:

            fft_data = np.abs(np.fft.rfft(data)).tolist()

            # Get max 128kHz ????
            fft_data = fft_data[:128]
            # fft_data = fft_data[1::10]

            processed_data.append({
                'type': 'FFT',
                'data': fft_data
            })

    output = {
        'status': 'OK',
        'data': processed_data
    }
    return json.dumps(output)
