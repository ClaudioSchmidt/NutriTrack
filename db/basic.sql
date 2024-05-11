--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-09 11:08:07 UTC

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16392)
-- Name: meals; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.meals (
    meal_id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(50) NOT NULL,
    rating bigint NOT NULL,
    calories bigint NOT NULL,
    carbohydrates double precision NOT NULL,
    fat double precision NOT NULL,
    protein double precision NOT NULL,
    vegetarian boolean DEFAULT false NOT NULL,
    vegan boolean DEFAULT false NOT NULL,
    picture bytea,
    date date DEFAULT now() NOT NULL
);


ALTER TABLE public.meals OWNER TO root;

--
-- TOC entry 217 (class 1259 OID 16419)
-- Name: meals_meal_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

ALTER TABLE public.meals ALTER COLUMN meal_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.meals_meal_id_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16404)
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    email character varying(50) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    height bigint,
    weight double precision
);


ALTER TABLE public.users OWNER TO root;

--
-- TOC entry 218 (class 1259 OID 16420)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3360 (class 0 OID 16392)
-- Dependencies: 215
-- Data for Name: meals; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.meals (meal_id, user_id, title, rating, calories, carbohydrates, fat, protein, vegetarian, vegan, picture, date) FROM stdin;
\.


--
-- TOC entry 3361 (class 0 OID 16404)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.users (user_id, email, first_name, last_name, password, height, weight) FROM stdin;
\.


--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 217
-- Name: meals_meal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.meals_meal_id_seq', 0, false);


--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1000, false);


--
-- TOC entry 3211 (class 2606 OID 16418)
-- Name: meals Rating zwischen 0-5; Type: CHECK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE public.meals
    ADD CONSTRAINT "Rating zwischen 0-5" CHECK (((rating >= 0) AND (rating <= 5))) NOT VALID;


--
-- TOC entry 3213 (class 2606 OID 16401)
-- Name: meals meal_id; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meal_id PRIMARY KEY (meal_id) INCLUDE (meal_id);


--
-- TOC entry 3215 (class 2606 OID 16410)
-- Name: users user_id; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_id PRIMARY KEY (user_id) INCLUDE (user_id);


--
-- TOC entry 3216 (class 2606 OID 16411)
-- Name: meals user_id; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) NOT VALID;


-- Completed on 2024-05-09 11:08:07 UTC

--
-- PostgreSQL database dump complete
--

