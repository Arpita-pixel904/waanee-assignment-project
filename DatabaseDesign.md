# Database Design

## Users

Stores application users.

Fields:

* id
* full_name
* email
* password_hash
* role
* is_active
* created_at
* updated_at

Relationship:

One user can create many leads.

One user can be assigned many leads.

---

## Leads

Stores lead information.

Fields:

* id
* name
* email
* phone
* source
* status
* notes
* assigned_to
* created_by
* created_at
* updated_at

Relationships:

assigned_to → users.id

created_by → users.id

---

## Activity Logs

Stores audit history.

Fields:

* id
* lead_id
* user_id
* activity_type
* old_value
* new_value
* created_at

Relationships:

lead_id → leads.id

user_id → users.id

---

## Indexes

Leads:

* status
* source
* assigned_to
* created_at

Users:

* role

Purpose:

Improve filtering, searching, sorting, and assignment operations.
