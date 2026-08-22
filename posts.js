/* ==========================================================================
   ORACLE DBA LOGBOOK DATASET ARRAY (Storage Layer)
   ========================================================================== */
const dbaConcepts = [
    {
        id: "post-1",
        title: "Oracle Memory Architecture: SGA vs PGA",
        category: "Architecture",
        summary: "Understanding internal memory allocation structures is vital for database initialization sizing and query tuning.",
        content: "The <strong>SGA (System Global Area)</strong> is shared by all server and background processes. The <strong>PGA (Program Global Area)</strong> is private memory allocated to each individual server process.",
        code: `-- Check current SGA and PGA allocations
SHOW PARAMETER sga;
SHOW PARAMETER pga;`
    },
    {
        id: "post-2",
        title: "Resolving ORA-01555: Snapshot Too Old",
        category: "Troubleshooting",
        summary: "How to address read-consistency issues during long-running reporting operations.",
        content: "This error occurs when a long-running query requires read-consistent blocks that have already been overwritten in the undo segments.",
        code: `-- Mitigation: Increase UNDO retention period
ALTER SYSTEM SET UNDO_RETENTION = 7200 SCOPE=BOTH;
ALTER DATABASE DATAFILE '/u01/app/oracle/oradata/undotbs01.dbf' AUTOEXTEND ON;`
    },
    {
        id: "post-3",
        title: "Generating Execution Plans Using DBMS_XPLAN",
        category: "Performance",
        summary: "How to extract and analyze the exact optimizer path for a problematic SQL query statement.",
        content: "Capture precise row-source execution strategy from the library cache footprint using the built-in system package.",
        code: `-- Step 1: Run query with diagnostics hint
SELECT /*+ GATHER_PLAN_STATISTICS */ employee_id FROM employees WHERE department_id = 20;

-- Step 2: Fetch display map diagnostics
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(FORMAT=>'ALLSTATS LAST'));`
    },
    {
        id: "post-4",
        title: "Automating Daily Incremental Backups with RMAN",
        category: "Backup",
        summary: "Production-ready Recovery Manager block checking backup pattern workflow.",
        content: "Deploying a structured backup topology ensures physical database integrity and provides clear recovery point objectives (RPO).",
        code: `# Execute inside RMAN executable CLI interface wrapper
RUN {
    ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;
    BACKUP INCREMENTAL LEVEL 1 
    TAG 'daily_inc_bkp'
    DATABASE PLUS ARCHIVELOG DELETE INPUT;
    RELEASE CHANNEL ch1;
}`
    },
    {
        id: "post-5",
        title: "Cloning a Pluggable Database (PDB) in Multitenant",
        category: "Multitenant",
        summary: "Rapid environment lifecycle provisioning technique for development testing teams.",
        content: "Multitenant architecture allows an administrator to instantly hot-clone local production target environments directly into staging profiles without interrupting live client transactions or application query workflows.",
        code: `-- Connect to the container database root (CDB$ROOT)
ALTER PLUGGABLE DATABASE prod_pdb CLOSE IMMEDIATE; -- If cold cloning
CREATE PLUGGABLE DATABASE test_pdb FROM prod_pdb;
ALTER PLUGGABLE DATABASE test_pdb OPEN READ WRITE;`
    },
     {
        id: "post-6",
        title: "Applying Oracle 19.31 Release Update (RU)",
        category: "Patching",
        summary: "Production runbook procedures for executing critical patch lifecycle updates securely via opatchauto or opatch.",
        content: "Deploying quarterly Release Updates (RUs) ensures optimal engine stability and patches known security vulnerabilities. The process requires careful validation checks, binary installation, and data dictionary changes via <code>datapatch</code>.",
        code: `# Execute prereq checks as Oracle home owner user
$ORACLE_HOME/OPatch/opatch prereq CheckConflictAgainstOHWithDetail -phBaseDir /u01/app/oracle/patches/36243123`
    },
    {
        id: "post-7",
        title: "Triage Runbook: ORA-01653 and ORA-01654 Unable to Extend Errors",
        category: "Storage",
        summary: "Production runtime triage actions for fixing ORA-01653 and ORA-01654 tablespace exhaustion exceptions safely.",
        content: "Encountering critical production alerts like <code>ORA-01653: unable to extend table HR.EMPLOYEES by 128 in tablespace USERS</code> or <code>ORA-01654: unable to extend index HR.EMP_EMP_ID_PK by 64 in tablespace USERS</code> will freeze application write operations completely. Resolving this requires immediate capacity checks and executing space expansion operations.",
        code: `-- Quick storage remediation: Add a fresh auto-extending datafile to clear the lock
ALTER TABLESPACE USERS 
ADD DATAFILE '/u01/app/oracle/oradata/CDB1/users02.dbf' 
SIZE 1G AUTOEXTEND ON NEXT 100M MAXSIZE 32G;`
    },
    {
        id: "post-8",
        title: "Triage Runbook: Fixing ORA-00257 Archiver Error Database Hangs",
        category: "Archiver",
        summary: "Emergency recovery steps for identifying FRA space depletion and purging archived logs securely via RMAN.",
        content: "An <code>ORA-00257: archiver error. Connect AS SYSDBA only until freed.</code> event brings your system production transaction loops to an absolute halt. This triage article provides the exact script sequences needed to query recovery area consumption metrics and clear down archive space safely.",
        code: `-- Emergency expansion parameters to instantly free database freezes
ALTER SYSTEM SET db_recovery_file_dest_size = 20G SCOPE=BOTH;`
    },
    {
        id: "post-9",
        title: "Production Runbook: Pre-Upgrade Database Health Pre-Checks",
        category: "Pre-Checks",
        summary: "A mandatory diagnostic runbook defining how to verify component health and create baseline logs before execution.",
        content: "Executing unverified operations on live production instances introduces massive business risk. Implementing a systematic pre-check routine using <code>DBA_REGISTRY</code> validation scripts creates an audit trail and ensures your rollback strategies remain secure.",
        code: `-- Run registry diagnostics sweep to confirm base integrity lines
SELECT comp_id, comp_name, version, status 
FROM dba_registry 
ORDER BY comp_id;`
    },
    {
        id: "post-10",
        title: "TDE Implementation: Encrypting Enterprise Data at Rest",
        category: "Security",
        summary: "A production security guide for configuring a software keystore wallet and deploying encrypted tablespaces safely.",
        content: "Complying with regulatory security standards requires protecting sensitive customer records at the storage level. Implementing Transparent Data Encryption (TDE) creates a secure layer on disk without breaking front-end application code configurations [1].",
        code: `-- Secure tablespace creation configuration using robust AES256 encryption metrics
CREATE TABLESPACE sensitive_app_data 
DATAFILE '/u01/app/oracle/oradata/orcl/sensdata01.dbf' SIZE 2G 
ENCRYPTION USING 'AES256' DEFAULT STORAGE(ENCRYPT);`
    },
    {
        id: "post-11",
        title: "Triage Runbook: Diagnosing Oracle RAC Cluster Node Evictions",
        category: "RAC",
        summary: "Production troubleshooting runbook for isolating private interconnect split-brain latency drops and Voting Disk failures.",
        content: "A sudden multi-node cluster eviction disrupts enterprise systems instantly. Pinpointing whether the crash was network-driven or disk-driven requires auditing <code>ocssd.log</code> components and executing <code>crsctl query css votedisk</code> sanity checks.",
        code: `# Gather AHF diagnostic bundle bundle across clusters instantly
sudo tfactl diagcollect -last 1h -cluster`
    },
    {
        id: "post-12",
        title: "Proactive Infrastructure Automation: Alert Log Shell Monitoring Daemons",
        category: "Automation",
        summary: "Deploying production-grade Linux Bash scripts to scan alert trace files and trigger instant error pings via cron hooks.",
        content: "Scaling enterprise architectures requires removing manual morning operational checks. Writing self-monitoring scripts that scan for critical kernel failures ensures your engineering teams can stabilize incidents before application layers freeze.",
        code: `# Trigger automated check routines every 15 minutes via system cron
grep -E "ORA-00600|ORA-04031|ORA-01578|ORA-00257" $ALERT_LOG | tail -n 5`
    },
     {
        id: "post-13",
        title: "Cloud Infrastructure Engineering: Zero Downtime Database Migrations (ZDM)",
        category: "Cloud",
        summary: "Leveraging Oracle ZDM CLI and physical Data Guard sync pipelines to migrate on-premises workloads to OCI with minimal downtime.",
        content: "Modern enterprise modernization demands near-zero disruption when shifting databases to hybrid cloud tiers. Employing the official Zero Downtime Migration (ZDM) pipeline automates infrastructure validation, RMAN backup streaming, and secure cloud switchovers.",
        code: `# Evaluate your custom cloud migration profile configurations
zdmauth -config /u01/app/oracle/zdm/zdm_migration_profile.rsp -eval`
    },
    {
        id: "post-14",
        title: "Data Pump Runbook: High-Speed Schema Refreshes via EXPDP / IMPDP",
        category: "DataPump",
        summary: "Production logical data movement guidelines utilizing parallel execution streams and namespace remapping parameters.",
        content: "Executing data center refreshes or testing migrations requires logical exports. Running <code>expdp</code> commands with multi-threaded parallel execution streams and configuring <code>REMAP_TABLESPACE</code> parameters ensures high-volume data streams import cleanly into alternate environment architectures.",
        code: `# Run high-speed multi-threaded schema dump export process
expdp apps_admin_user/SecurePass123@PROD_DB \\
    SCHEMAS=HR,FINANCE \\
    DIRECTORY=target_dp_dir \\
    DUMPFILE=prod_refresh_%U.dmp \\
    PARALLEL=4 COMPRESSION=ALL`
    },
    {
        id: "post-15",
        title: "Tuning Runbook: Lock Execution Stability Using SQL Plan Baselines",
        category: "Baselines",
        summary: "Production query optimization guidelines using the DBMS_SPB package to lock plans and prevent plan regressions.",
        content: "Sudden optimizer plan regressions disrupt transaction stability instantly. Utilizing SQL Plan Baselines ensures that the database engine adheres exclusively to verified, accepted plan pathways, filtering out sub-optimal execution branches during database shifts.",
        code: `-- Load stable plans from historical AWR snapshots into baselines
DECLARE
    v_awr_plans PLS_INTEGER;
BEGIN
    v_awr_plans := DBMS_SPB.LOAD_PLANS_FROM_AWR(begin_snap => 4520, end_snap => 4530, basic_filter => 'sql_id=''a87g6fd5sa98s''');
END;\n/`
    },
        {
        id: "post-16",
        title: "Emergency Triage Runbook: Forcing Query Execution Stability via SQL Patches",
        category: "Pinning",
        summary: "Injecting production-level optimizer hints using the DBMS_SQLDIAG utility package to override regressed query paths instantly.",
        content: "When a critical SQL statement regresses under peak production pressure, waiting for an application code redeployment window is impossible. Using a SQL Patch allows you to directly attach optimizer hints to the database dictionary text blueprint, force-stabilizing the plan layout instantly.",
        code: `-- Inject an emergency optimizer hint directly onto a query signature text string
DECLARE
    v_patch_name VARCHAR2(30);
BEGIN
    v_patch_name := DBMS_SQLDIAG.CREATE_SQL_PATCH(
        sql_text  => 'SELECT * FROM hr.employees WHERE department_id = :b1',
        hint_text => 'INDEX(employees EMP_DEPT_IX)',
        name      => 'PATCH_FORCE_INDEX_EMERGENCY'
    );
END;
/`
    },
     {
        id: "post-17",
        title: "Compliance Governance: Enforcing Data Security via Unified Auditing",
        category: "Auditing",
        summary: "A production database security guide for building targeted unified auditing policies and managing log trails via DBMS_AUDIT_MGMT.",
        content: "Meeting corporate compliance guidelines requires deep operational trace tracking. Deploying localized Unified Auditing policies allows a database administrator to transparently intercept high-privilege administrative actions or view queries targeting sensitive data columns without degrading query execution performance metrics.",
        code: `-- Activate a customized administrative tracking policy globally across containers
CREATE AUDIT POLICY sys_admin_audit_policy
    ACTIONS ALTER SYSTEM, DROP USER, ALTER DATABASE, CREATE USER;
AUDIT POLICY sys_admin_audit_policy;`
    }

];
