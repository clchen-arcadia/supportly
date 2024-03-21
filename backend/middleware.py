from flask import g, jsonify
from functools import wraps


def ensure_admin(func):
    @wraps(func)
    def validate_admin(*args, **kwargs):
        if (g.user is None):
            return jsonify({"error": "User not authorized."}), 401
        if (g.user.get('is_admin') is True):
            return func(*args, **kwargs)
        else:
            return jsonify({"error": "User not authorized."}), 401
    return validate_admin


def ensure_logged_in(func):
    @wraps(func)
    def validate_logged_in(*args, **kwargs):
        if (g.user is not None):
            return func(*args, **kwargs)
        else:
            return jsonify({"error": "User not authorized."}), 401
    return validate_logged_in
