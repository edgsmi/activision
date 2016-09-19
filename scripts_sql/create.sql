
CREATE TABLE COUNTRY
( 
  C_ID VARCHAR2(2) NOT NULL,
  CONSTRAINT PK_COUNTRY PRIMARY KEY (C_ID)
);

CREATE TABLE PLATFORM
( 
  P_ID VARCHAR2(30) NOT NULL,
  CONSTRAINT PK_PLATFORM PRIMARY KEY (P_ID)
);


CREATE TABLE ENVIRONMENT
( 
  --E_ID NUMBER(3) NOT NULL,
  E_COUNTRY VARCHAR2(2),
  E_PLATFORM VARCHAR2(30) NOT NULL,
  E_DESCRIPTION VARCHAR2(200),
  E_BASE_URL VARCHAR2(200),
  E_SERVICE VARCHAR2(100),
  CONSTRAINT PK_ENVIRONMENT PRIMARY KEY (E_COUNTRY, E_PLATFORM),
  CONSTRAINT "ENVIRONMENT_COUNTRY" FOREIGN KEY ("E_COUNTRY") REFERENCES "COUNTRY" ("C_ID"),
  CONSTRAINT "ENVIRONMENT_PLATFORM" FOREIGN KEY ("E_PLATFORM") REFERENCES "PLATFORM" ("P_ID")
);

CREATE TABLE FEATURE
( 
  F_ID NUMBER(3) NOT NULL,
  F_NAME VARCHAR2(30) NOT NULL,
  F_DESCRIPTION VARCHAR2(200),
  CONSTRAINT PK_FEATURE PRIMARY KEY (F_ID),
  CONSTRAINT F_NAME_UNIQUE UNIQUE (F_NAME)
);

CREATE TABLE VERSION
( 
  V_ID NUMBER(3) NOT NULL,
  V_NAME VARCHAR2(20) NOT NULL,
  V_DESCRIPTION VARCHAR2(200),
  CONSTRAINT PK_VERSION PRIMARY KEY (V_ID),
  CONSTRAINT V_NAME_UNIQUE UNIQUE (V_NAME)
);

CREATE TABLE JIRA
( 
  J_ID NUMBER(5) NOT NULL,
  J_NAME VARCHAR2(20) NOT NULL,
  J_DESCRIPTION VARCHAR2(200),
  J_VERSION NUMBER(3) NOT NULL,
  J_FEATURE NUMBER(3) NOT NULL,
  CONSTRAINT PK_JIRA PRIMARY KEY (J_ID),
  CONSTRAINT "JIRA_VERSION" FOREIGN KEY ("J_VERSION") REFERENCES "VERSION" ("V_ID"),
  CONSTRAINT "JIRA_FEATURE" FOREIGN KEY ("J_FEATURE") REFERENCES "JIRA" ("J_ID"),
  CONSTRAINT J_NAME_UNIQUE UNIQUE (J_NAME)
);


CREATE TABLE PROPERTY_TYPE (
  PT_ID NUMBER(3) NOT NULL,
  PT_NAME VARCHAR2(100) NOT NULL,
  PT_ABBREV VARCHAR2(10) NOT NULL,
  PT_DESCRIPTION VARCHAR2(200),
  CONSTRAINT PK_PROPERTY_TYPE PRIMARY KEY (PT_ID),
  CONSTRAINT PT_NAME_UNIQUE UNIQUE (PT_NAME)
);

CREATE TABLE PROP
( 
  P_KEY VARCHAR2(255) NOT NULL,
  P_TYPE NUMBER(3) NOT NULL, 
  P_JIRA NUMBER(5) NOT NULL,
  P_VALUE_ACTIVATION VARCHAR2(2000),
  CONSTRAINT "PK_PROP" PRIMARY KEY ("P_KEY", "P_TYPE"),
  CONSTRAINT "PROP_PT" FOREIGN KEY ("P_TYPE") REFERENCES "PROPERTY_TYPE" ("PT_ID"),
  CONSTRAINT "PROP_JIR" FOREIGN KEY ("P_JIRA") REFERENCES "JIRA" ("J_ID")
);