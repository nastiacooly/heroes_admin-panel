import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFiltersQuery } from "../../api/apiSlice";
import { filterApply } from "./filtersSlice";

const HeroesFilters = () => {
	const { data: filters = [], isLoading } = useGetFiltersQuery();
	const activeFilter = useSelector((state) => state.filters.activeFilter);
	const dispatch = useDispatch();

	const onApplyFilter = useCallback(
		(filterValue) => {
			dispatch(filterApply(filterValue));
		},
		[dispatch]
	);

	const filterButtons = useMemo(() => {
		const filtersToMap = filters.slice();
		return filtersToMap.map(({ value, rusValue, className }, i) => {
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
	}, [filters, activeFilter, onApplyFilter]);

	if (isLoading) {
		return null;
	}

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">{filterButtons}</div>
			</div>
		</div>
	);
};

export default HeroesFilters;
