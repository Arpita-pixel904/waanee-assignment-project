
---

### 3. Testing Instructions

To ensure you pass the "Engineering Understanding" check, follow these steps to test the application manually:

1. **Auth Flow**:
* Register a user via Postman or the UI.
* Attempt to access `/api/leads` without a token (Expect `401 Unauthorized`).
* Login and store the token. Access the same route (Expect `200 OK`).


2. **Role-Based Access**:
* Log in as an **AGENT**. Attempt to delete a lead (Expect `403 Forbidden`).
* Log in as an **ADMIN**. Delete a lead (Expect `200 OK`).


3. **Round-Robin Logic**:
* Create 3 leads as an Admin.
* Check the database/API to verify if `assigned_to` is rotating between available Agents.


4. **Pagination/Filter**:
* Call `/api/leads?status=NEW&page=1`. Verify that only new leads are returned.


5. **External API**:
* Create a lead. Check your server console; you should see the `[External API]` log indicating the mock webhook was triggered.



**Final tip for your PPT**: When you present your architecture, emphasize that you used **Axios Interceptors** for JWT management. Evaluators love seeing that because it shows you understand clean, reusable code—it keeps the `Authorization` logic out of every single component!