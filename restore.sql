--
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE bank;
--
-- Name: bank; Type: DATABASE; Schema: -; Owner: bank
--

CREATE DATABASE bank WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Portuguese_Angola.1252';


ALTER DATABASE bank OWNER TO bank;

\connect bank

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: estadoconta; Type: TYPE; Schema: public; Owner: bank
--

CREATE TYPE public.estadoconta AS ENUM (
    'Activo',
    'Inactiva'
);


ALTER TYPE public.estadoconta OWNER TO bank;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contas; Type: TABLE; Schema: public; Owner: bank
--

CREATE TABLE public.contas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    pessoa_id uuid NOT NULL,
    saldo numeric NOT NULL,
    limitesaquediario numeric,
    flagat public.estadoconta DEFAULT 'Activo'::public.estadoconta NOT NULL,
    tipo_conta_id uuid NOT NULL,
    data_criacao timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.contas OWNER TO bank;

--
-- Name: operacoes; Type: TABLE; Schema: public; Owner: bank
--

CREATE TABLE public.operacoes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    operacao character varying(50) NOT NULL,
    tipo_operacao_id uuid NOT NULL,
    data_criacao timestamp without time zone DEFAULT now()
);


ALTER TABLE public.operacoes OWNER TO bank;

--
-- Name: pessoas; Type: TABLE; Schema: public; Owner: bank
--

CREATE TABLE public.pessoas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nome character varying(50) NOT NULL,
    cpf character varying(14),
    data_nascimento date,
    data_criacao timestamp without time zone DEFAULT now()
);


ALTER TABLE public.pessoas OWNER TO bank;

--
-- Name: tipoconta; Type: TABLE; Schema: public; Owner: bank
--

CREATE TABLE public.tipoconta (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    conta character varying(50),
    data_criacao timestamp without time zone DEFAULT now()
);


ALTER TABLE public.tipoconta OWNER TO bank;

--
-- Name: tipooperacao; Type: TABLE; Schema: public; Owner: bank
--

CREATE TABLE public.tipooperacao (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    operacao character varying(50) NOT NULL,
    tipo_operacao character varying(50) NOT NULL,
    data_criacao timestamp without time zone DEFAULT now()
);


ALTER TABLE public.tipooperacao OWNER TO bank;

--
-- Name: transacoes; Type: TABLE; Schema: public; Owner: bank
--

CREATE TABLE public.transacoes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    conta_id uuid NOT NULL,
    valor numeric NOT NULL,
    data_transacao timestamp without time zone DEFAULT now() NOT NULL,
    operacao_id uuid NOT NULL,
    data_criacao timestamp without time zone DEFAULT now()
);


ALTER TABLE public.transacoes OWNER TO bank;

--
-- Data for Name: contas; Type: TABLE DATA; Schema: public; Owner: bank
--

COPY public.contas (id, pessoa_id, saldo, limitesaquediario, flagat, tipo_conta_id, data_criacao) FROM stdin;
\.
COPY public.contas (id, pessoa_id, saldo, limitesaquediario, flagat, tipo_conta_id, data_criacao) FROM '$$PATH$$/3046.dat';

--
-- Data for Name: operacoes; Type: TABLE DATA; Schema: public; Owner: bank
--

COPY public.operacoes (id, operacao, tipo_operacao_id, data_criacao) FROM stdin;
\.
COPY public.operacoes (id, operacao, tipo_operacao_id, data_criacao) FROM '$$PATH$$/3048.dat';

--
-- Data for Name: pessoas; Type: TABLE DATA; Schema: public; Owner: bank
--

COPY public.pessoas (id, nome, cpf, data_nascimento, data_criacao) FROM stdin;
\.
COPY public.pessoas (id, nome, cpf, data_nascimento, data_criacao) FROM '$$PATH$$/3044.dat';

--
-- Data for Name: tipoconta; Type: TABLE DATA; Schema: public; Owner: bank
--

COPY public.tipoconta (id, conta, data_criacao) FROM stdin;
\.
COPY public.tipoconta (id, conta, data_criacao) FROM '$$PATH$$/3045.dat';

--
-- Data for Name: tipooperacao; Type: TABLE DATA; Schema: public; Owner: bank
--

COPY public.tipooperacao (id, operacao, tipo_operacao, data_criacao) FROM stdin;
\.
COPY public.tipooperacao (id, operacao, tipo_operacao, data_criacao) FROM '$$PATH$$/3047.dat';

--
-- Data for Name: transacoes; Type: TABLE DATA; Schema: public; Owner: bank
--

COPY public.transacoes (id, conta_id, valor, data_transacao, operacao_id, data_criacao) FROM stdin;
\.
COPY public.transacoes (id, conta_id, valor, data_transacao, operacao_id, data_criacao) FROM '$$PATH$$/3049.dat';

--
-- Name: contas contas_pkey; Type: CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.contas
    ADD CONSTRAINT contas_pkey PRIMARY KEY (id);


--
-- Name: operacoes operacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.operacoes
    ADD CONSTRAINT operacoes_pkey PRIMARY KEY (id);


--
-- Name: pessoas pessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.pessoas
    ADD CONSTRAINT pessoa_pkey PRIMARY KEY (id);


--
-- Name: tipoconta tipoconta_pkey; Type: CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.tipoconta
    ADD CONSTRAINT tipoconta_pkey PRIMARY KEY (id);


--
-- Name: tipooperacao tipooperacao_pkey; Type: CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.tipooperacao
    ADD CONSTRAINT tipooperacao_pkey PRIMARY KEY (id);


--
-- Name: transacoes transacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.transacoes
    ADD CONSTRAINT transacoes_pkey PRIMARY KEY (id);


--
-- Name: contas contas_pessoa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.contas
    ADD CONSTRAINT contas_pessoa_id_fkey FOREIGN KEY (pessoa_id) REFERENCES public.pessoas(id);


--
-- Name: contas contas_tipo_conta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.contas
    ADD CONSTRAINT contas_tipo_conta_id_fkey FOREIGN KEY (tipo_conta_id) REFERENCES public.tipoconta(id);


--
-- Name: operacoes operacoes_tipo_operacao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.operacoes
    ADD CONSTRAINT operacoes_tipo_operacao_id_fkey FOREIGN KEY (tipo_operacao_id) REFERENCES public.tipooperacao(id);


--
-- Name: transacoes transacoes_operacao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bank
--

ALTER TABLE ONLY public.transacoes
    ADD CONSTRAINT transacoes_operacao_id_fkey FOREIGN KEY (operacao_id) REFERENCES public.operacoes(id);


--
-- PostgreSQL database dump complete
--

