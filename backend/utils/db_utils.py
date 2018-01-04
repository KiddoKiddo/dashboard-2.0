import sqlite3
from flask import *

"""
	Not in use yet
	The idea is to creat sqlite3 db attached with this application instead of using csv
	But I have not been able to connect to sqlite through FLASK app
"""

DATABASE = '~/workspace/dashboard-im/backend/db/dashboard.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


# @app.teardown_appcontext
# def close_connection(exception):
#     db = getattr(g, '_database', None)
#     if db is not None:
#         db.close()


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv
