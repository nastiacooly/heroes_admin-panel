import { useSelector, useDispatch } from "react-redux";

import { filterApply } from "../../actions";

const HeroesFilters = () => {
	const { filters, filtersFetchingStatus, activeFilter } = useSelector(
		(state) => state.filters
	);
	const dispatch = useDispatch();

	if (filtersFetchingStatus === "loading") {
		return null;
	}

	const onApplyFilter = (filterValue) => {
		dispatch(filterApply(filterValue));
	};

	const mapFiltersToButtons = (filters) => {
		return filters.map(({ value, rusValue, className }, i) => {
			let classNames =
				activeFilter === value ? `${className} active` : className;
			return (
				<button
					key={i}
					className={classNames}
					onClick={() => onApplyFilter(value)}
				>
					{rusValue}
				</button>
			);
		});
	};

	const buttons = mapFiltersToButtons(filters);

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">{buttons}</div>
			</div>
		</div>
	);
};

export default HeroesFilters;
