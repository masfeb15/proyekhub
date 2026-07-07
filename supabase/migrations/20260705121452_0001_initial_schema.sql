-- ==========================================
-- ProyekHub Initial Schema
-- Version : 0.1.0
-- Sprint  : 2.1.2
-- ==========================================

-- ===========
-- Extensions
-- ===========

create extension if not exists "pgcrypto";

-- ===========
-- ENUM Types
-- ===========

create type project_type_enum as enum (
  'HOSPITAL',
  'HOTEL',
  'OFFICE',
  'MALL',
  'FACTORY',
  'WAREHOUSE',
  'INFRASTRUCTURE',
  'OTHER'
);

create type discipline_scope_enum as enum (
  'MECHANICAL',
  'ELECTRICAL',
  'PLUMBING',
  'MEP',
  'MEDICAL_GAS'
);

create type contract_method_enum as enum (
  'LUMP_SUM',
  'UNIT_PRICE',
  'DESIGN_BUILD'
);

create type project_status as enum (
  'DRAFT',
  'TENDER',
  'AWARDED',
  'MOBILIZATION',
  'RUNNING',
  'PUNCH_LIST',
  'COMPLETED',
  'CLOSED',
  'CANCELLED'
);

create type contract_status as enum (
  'ORIGINAL',
  'ADDENDUM',
  'FINAL'
);

create type user_role as enum (
  'SUPER_ADMIN',
  'COMPANY_ADMIN',
  'PROJECT_MANAGER',
  'SITE_ENGINEER',
  'QS',
  'LOGISTIC',
  'DIRECTOR'
);

-- =========================
-- Function : updated_at
-- =========================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;
-- ==========================================
-- Table : companies
-- ==========================================

create table public.companies (
    id uuid primary key default gen_random_uuid(),

    code text not null,

    name text not null,

    address text,
    phone text,
    email text 
    check (
    email is null
    or email ~* 
    '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    ),
    logo_url text,
    
    constraint uq_company_code
    unique(code),

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    deleted_at timestamptz,
    is_active boolean not null default true
);

create trigger trg_companies_updated_at
before update on public.companies
for each row
execute function public.set_updated_at();

create index idx_companies_code
on public.companies(code);

create index idx_companies_name
on public.companies(name);
-- ==========================================
-- Table : profiles
-- ==========================================

create table public.profiles (

    id uuid primary key
        references auth.users(id)
        on delete cascade,

    company_id uuid not null
        references public.companies(id)
        on delete restrict,

    full_name text not null,

    phone text,

    job_title text,

    role user_role not null default 'SITE_ENGINEER',

    avatar_url text,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    deleted_at timestamptz
);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create index idx_profiles_company
on public.profiles(company_id);

create index idx_profiles_role
on public.profiles(role);
-- ==========================================
-- Table : clients
-- ==========================================

create table public.clients (

    id uuid primary key default gen_random_uuid(),

    company_id uuid not null
        references public.companies(id)
        on delete restrict,

    client_name text not null,

    code text not null,
    constraint uq_clients_company_code
    unique(company_id, code),

    contact_person text,

    phone text,
    email text check (
    email is null
    or email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    ),

    address text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    deleted_at timestamptz,
    
    is_active boolean not null default true
);

-- ==========================================
-- Trigger : clients updated_at
-- ==========================================

create trigger trg_clients_updated_at
before update on public.clients
for each row
execute function public.set_updated_at();

-- ==========================================
-- Indexes
-- ==========================================

create index idx_clients_company
on public.clients(company_id);

create index idx_clients_name
on public.clients(client_name);

-- ==========================================
-- Table : projects
-- ==========================================

create table public.projects (

    id uuid primary key default gen_random_uuid(),

    company_id uuid not null
        references public.companies(id)
        on delete restrict,

    client_id uuid not null
        references public.clients(id)
        on delete restrict,

    project_code text not null,
    constraint uq_projects_company_code
    unique(company_id, project_code),

    project_name text not null,

    project_type project_type_enum,

    discipline_scope discipline_scope_enum,

    contract_method contract_method_enum,

    site_address text,

    notes text,

    currency char(3) not null default 'IDR',

    current_contract_value numeric(18,2)
    not null
    default 0
    check (current_contract_value >= 0),

    start_date date,

    finish_date date,

    status project_status not null default 'DRAFT',

    description text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    deleted_at timestamptz
);

-- ==========================================
-- Trigger
-- ==========================================

create trigger trg_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

-- ==========================================
-- Index
-- ==========================================

create index idx_projects_company
on public.projects(company_id);

create index idx_projects_client
on public.projects(client_id);

create index idx_projects_status
on public.projects(status);

create index idx_projects_name
on public.projects(project_name);

create index idx_projects_code
on public.projects(project_code);

-- ==========================================
-- Table : project_contracts
-- ==========================================

create table public.project_contracts (

    id uuid primary key default gen_random_uuid(),

    project_id uuid not null
        references public.projects(id)
        on delete cascade,

    company_id uuid not null
    references public.companies(id)
    on delete restrict,

    revision_no integer not null default 0,
    check (revision_no >= 0),

    contract_status contract_status not null default 'ORIGINAL',

    contract_number text,

    contract_name text not null,

    contract_value numeric(18,2)
    not null
    default 0
    check (contract_value >= 0),

    effective_date date not null,

    description text,

    contract_file_url text,

    signed_by text,

    constraint uq_project_revision
    unique(project_id, revision_no),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    deleted_at timestamptz
);

-- ==========================================
-- Trigger
-- ==========================================

create trigger trg_project_contracts_updated_at
before update on public.project_contracts
for each row
execute function public.set_updated_at();

-- ==========================================
-- Table : activity_logs
-- ==========================================

create table public.activity_logs (

    id uuid primary key default gen_random_uuid(),

    company_id uuid not null
        references public.companies(id)
        on delete restrict,

    user_id uuid
        references auth.users(id)
        on delete set null,

    module text not null,

    action text not null,

    entity_id uuid,

    entity_name text,

    old_data jsonb,

    new_data jsonb,

    ip_address inet,

    user_agent text,

    description text,

    created_at timestamptz not null default now()
);

create index idx_activity_company
on public.activity_logs(company_id);

create index idx_activity_user
on public.activity_logs(user_id);

create index idx_activity_module
on public.activity_logs(module);

create index idx_activity_created
on public.activity_logs(created_at);

-- ==========================================
-- Indexes
-- ==========================================

create index idx_project_contracts_project
on public.project_contracts(project_id);

create index idx_project_contracts_revision
on public.project_contracts(project_id, revision_no);


-- ==========================================
-- Comments
-- ==========================================

COMMENT ON TABLE public.projects
IS 'Master data proyek';

COMMENT ON COLUMN public.projects.project_code
IS 'Kode unik proyek dalam satu perusahaan';

COMMENT ON COLUMN public.projects.current_contract_value
IS 'Nilai kontrak aktif terbaru setelah addendum';

COMMENT ON COLUMN public.projects.status
IS 'Status siklus hidup proyek';