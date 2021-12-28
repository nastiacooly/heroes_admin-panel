import { Formik, Field } from "formik";

import { v4 as uuidv4 } from "uuid";

import { useMemo } from "react";
import { useCreateHeroMutation, useGetFiltersQuery } from "../../api/apiSlice";

import Spinner from "../spinner/Spinner";

const HeroesAddForm = () => {
	const [createHero, { isLoading, isError }] = useCreateHeroMutation();
	const {
		data: filters = [],
		isLoading: isFiltersLoading,
		isError: isFiltersError,
	} = useGetFiltersQuery();

	const filterOptions = useMemo(() => {
		// Copy of query data
		const filtersToMap = filters.slice();
		// Mapping filters
		return filtersToMap
			.filter(({ value }) => value !== "all")
			.map(({ value, rusValue }, i) => {
				return (
					<option key={i} value={value}>
						{rusValue}
					</option>
				);
			});
	}, [filters]);

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
		// Saving hero to DB and state (store)
		createHero(hero).unwrap();
		setTimeout(() => resetForm(), 1500);
	};

	if (isFiltersLoading) {
		return <Spinner />;
	}

	if (isFiltersError) {
		return (
			<h5 className="text-center mt-5">Ошибка загрузки доступных фильтров</h5>
		);
	}

	if (isError) {
		return <h5 className="text-center mt-5">Ошибка создания героя</h5>;
	}

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
							<option value="" disabled defaultValue>
								Я владею элементом...
							</option>
							{filterOptions}
						</Field>
						{errors.element && touched.element && errors.element}
					</div>

					{isLoading ? (
						<Spinner />
					) : (
						<button
							type="submit"
							className="btn btn-primary"
							disabled={isSubmitting}
						>
							Создать
						</button>
					)}
				</form>
			)}
		</Formik>
	);
};

export default HeroesAddForm;
