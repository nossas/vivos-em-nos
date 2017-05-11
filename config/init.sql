--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: memories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE memories (
    id integer NOT NULL,
    owner_first_name character varying NOT NULL,
    owner_last_name character varying,
    owner_email character varying NOT NULL,
    owner_country character varying NOT NULL,
    victim_name character varying NOT NULL,
    victim_born_at integer NOT NULL,
    victim_dead_at integer NOT NULL,
    victim_city character varying NOT NULL,
    victim_history text NOT NULL,
    victim_remember_text text,
    victim_good_words text,
    victim_photo text NOT NULL,
    victim_silhouette character varying NOT NULL,
    authorized_to_site boolean DEFAULT false,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    token uuid DEFAULT uuid_generate_v4()
);


--
-- Name: memories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE memories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: memories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY memories ALTER COLUMN id SET DEFAULT nextval('memories_id_seq'::regclass);

--
-- Name: memories memories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memories
    ADD CONSTRAINT memories_pkey PRIMARY KEY (id);

--
-- Name: memories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE memories_id_seq OWNED BY memories.id;


--
-- Name: memory_assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE memory_assets (
    id integer NOT NULL,
    memory_id int not null references memories(id),
    asset_type character varying NOT NULL,
    asset_url text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: memory_assets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE memory_assets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: memory_assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE memory_assets_id_seq OWNED BY memory_assets.id;


--
-- Name: memory_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE memory_comments (
    id integer NOT NULL,
    memory_id integer,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email text NOT NULL,
    comment text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: memory_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE memory_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: memory_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE memory_comments_id_seq OWNED BY memory_comments.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: memory_assets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY memory_assets ALTER COLUMN id SET DEFAULT nextval('memory_assets_id_seq'::regclass);


--
-- Name: memory_comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY memory_comments ALTER COLUMN id SET DEFAULT nextval('memory_comments_id_seq'::regclass);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);




--
-- Name: memory_assets memory_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memory_assets
    ADD CONSTRAINT memory_assets_pkey PRIMARY KEY (id);


--
-- Name: memory_comments memory_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memory_comments
    ADD CONSTRAINT memory_comments_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: email_comment_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX email_comment_idx ON memory_comments USING btree (lower(email));


--
-- Name: index_memory_assets_on_memory_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_memory_assets_on_memory_id ON memory_assets USING btree (memory_id);


--
-- Name: index_memory_comments_on_memory_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_memory_comments_on_memory_id ON memory_comments USING btree (memory_id);


--
-- Name: owner_email_mem_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX owner_email_mem_idx ON memories USING btree (lower((owner_email)::text));


--
-- Name: memory_assets fk_rails_4ca67e4a5d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memory_assets
    ADD CONSTRAINT fk_rails_4ca67e4a5d FOREIGN KEY (memory_id) REFERENCES memories(id);


--
-- Name: memory_comments fk_rails_f039a7080c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memory_comments
    ADD CONSTRAINT fk_rails_f039a7080c FOREIGN KEY (memory_id) REFERENCES memories(id);


--
-- Update fields
--
alter table memories
    alter column created_at drop not null,
    alter column updated_at drop not null;

alter table memory_assets
    alter column created_at drop not null,
    alter column updated_at drop not null;

alter table memory_comments
    alter column created_at drop not null,
    alter column updated_at drop not null;

ALTER TABLE memories
    ALTER COLUMN created_at SET DEFAULT now();

ALTER TABLE memory_assets
    ALTER COLUMN created_at SET DEFAULT now();

ALTER TABLE memory_comments
    ALTER COLUMN created_at SET DEFAULT now();

CREATE FUNCTION update_updated_at() RETURNS trigger AS $$
    BEGIN
        NEW.updated_at := NOW();
        RETURN NEW;
    END;
$$ language plpgsql;

CREATE FUNCTION update_created_at() RETURNS trigger AS $$
    BEGIN
        NEW.created_at := NOW();
        RETURN NEW;
    END;
$$ language plpgsql;

CREATE FUNCTION update_token() RETURNS trigger AS $$
    BEGIN
        NEW.token := uuid_generate_v4();
        RETURN NEW;
    END;
$$ language plpgsql;

CREATE TRIGGER update_token BEFORE INSERT ON memories FOR EACH ROW EXECUTE PROCEDURE update_token();

CREATE TRIGGER update_created_at BEFORE INSERT ON memories FOR EACH ROW EXECUTE PROCEDURE update_created_at();

CREATE TRIGGER update_updated_at BEFORE UPDATE ON memories FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_updated_at BEFORE UPDATE ON memory_assets FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_updated_at BEFORE UPDATE ON memory_comments FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE OR REPLACE FUNCTION notify_new_memory() RETURNS trigger language plpgsql as $$
    begin
        perform pg_notify('new_memories', row_to_json(NEW.*)::text);
        return null;
    end;
$$;

CREATE TRIGGER notify_new_memory AFTER INSERT ON memories FOR EACH ROW EXECUTE PROCEDURE notify_new_memory();

--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20170419110742'),
('20170419111719'),
('20170419112030'),
('20170419115336');

--
-- Migration: 20170430213358
--
ALTER TABLE memory_comments RENAME COLUMN first_name TO name;
ALTER TABLE memory_comments DROP COLUMN last_name;

--
-- Migration: 20170430213358
--
ALTER TABLE memories ADD COLUMN featured_site BOOLEAN DEFAULT FALSE;

--
-- Migration: 20170506171857
--
CREATE OR REPLACE FUNCTION slug(memory memories) RETURNS TEXT AS $$
  SELECT REPLACE(LOWER(unaccent(memory.victim_name)), ' ', '-');
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION memory_by_slug(search TEXT) RETURNS memories AS $$
  SELECT * FROM memories
  WHERE LOWER(slug(memories.*)) = LOWER(unaccent(search))
  LIMIT 1
$$ LANGUAGE SQL STABLE;

--
-- Migration: 20170510175809
--
ALTER TABLE memories ADD COLUMN IF NOT EXISTS language character varying DEFAULT 'pt';
