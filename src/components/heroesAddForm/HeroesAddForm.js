import { Formik, Field } from "formik";

import { v4 as uuidv4 } from "uuid";

import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";

import {
	filtersFetched,
	filtersFetching,
	heroCreate,
	heroCreatingError,
} from "../../actions";

import Spinner from "../spinner/Spinner";

const HeroesAddForm = () => {
	const { heroCreatingStatus, filters, filtersFetchingStatus } = useSelector(
		(state) => state
	);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		// Fetching filters from DB on first render
		dispatch(filtersFetching());
		request("http://localhost:3001/filters")
			.then((filters) => {
				dispatch(filtersFetched(filters));
			})
			.catch((e) => console.log(e));
		// eslint-disable-next-line
	}, []);

	const mapFiltersToSelectOptions = (filters) => {
		return filters
			.filter(({ value }) => value !== "all")
			.map(({ value, rusValue }, i) => {
				return (
					<option key={i} value={value}>
						{rusValue}
					</option>
				);
			});
	};

	const onSubmit = (values, resetForm) => {
		// Generating unique id for hero
		const id = uuidv4();
		// Creating hero object
		const hero = {
			id,
			name: values.name,
			description: values.description,
			element: values.element,
		};
		const body = JSON.stringify(hero);
		// Saving hero to DB and state (store)
		request(`http://localhost:3001/heroes`, "POST", body)
			.then((hero) => dispatch(heroCreate(hero)))
			.catch(() => dispatch(heroCreatingError()))
			.finally(() => resetForm());
	};

	if (filtersFetchingStatus === "loading") {
		return <Spinner />;
	}

	if (heroCreatingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка создания героя</h5>;
	}

	const options = mapFiltersToSelectOptions(filters);

	return (
		<Formik
			initialValues={{
				name: "",
				description: "",
				element: "",
			}}
			validate={(values) => {
				const errors = {};
				if (!values.name) {
					errors.name = "Required";
					if (!values.description) {
						errors.description = "Required";
					}
					if (!values.element) {
						errors.element = "Required";
					}
					return errors;
				}
			}}
			onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
		>
			{({ errors, touched, handleSubmit, isSubmitting }) => (
				<form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="name" className="form-label fs-4">
							Имя нового героя
						</label>
						<Field
							type="text"
							name="name"
							placeholder="Как меня зовут?"
							className="form-control"
							id="name"
						/>
						{errors.name && touched.name && errors.name}
					</div>

					<div className="mb-3">
						<label htmlFor="text" className="form-label fs-4">
							Описание
						</label>
						<Field
							as="textarea"
							name="description"
							placeholder="Что я умею?"
							className="form-control"
							id="description"
							style={{ height: "130px" }}
						/>
						{errors.description && touched.description && errors.description}
					</div>

					<div className="mb-3">
						<label htmlFor="element" className="form-label">
							Выбрать элемент героя
						</label>
						<Field
							as="select"
							name="element"
							className="form-select"
							id="element"
							placeholder="Я владею элементом"
						>
							<option value="" disabled selected>
								Я владею элементом...
							</option>
							{options}
						</Field>
						{errors.element && touched.element && errors.element}
					</div>

					<button
						type="submit"
						className="btn btn-primary"
						disabled={isSubmitting}
					>
						Создать
					</button>
				</form>
			)}
		</Formik>
	);
};

export default HeroesAddForm;
