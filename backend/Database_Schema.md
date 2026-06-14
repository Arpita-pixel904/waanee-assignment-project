```SQL
CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK(role IN ('ADMIN','MANAGER','AGENT')),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    token TEXT NOT NULL,

    expires_at TIMESTAMP NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE leads (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(255),

    phone VARCHAR(20),

    source VARCHAR(100),

    status VARCHAR(50) DEFAULT 'NEW',

    notes TEXT,

    assigned_to INTEGER
        REFERENCES users(id),

    created_by INTEGER NOT NULL
        REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,

    lead_id INTEGER
        REFERENCES leads(id)
        ON DELETE CASCADE,

    user_id INTEGER
        REFERENCES users(id),

    activity_type VARCHAR(50) NOT NULL,

    old_value JSONB,

    new_value JSONB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_status
ON leads(status);

CREATE INDEX idx_leads_source
ON leads(source);

CREATE INDEX idx_leads_assigned_to
ON leads(assigned_to);

CREATE INDEX idx_users_role
ON users(role);

CREATE INDEX idx_leads_created_at
ON leads(created_at DESC);

```