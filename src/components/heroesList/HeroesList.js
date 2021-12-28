import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useGetHeroesQuery } from "../../api/apiSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
	const {
		data: heroes = [],
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetHeroesQuery();

	const activeFilter = useSelector((state) => state.filters.activeFilter);

	const filteredHeroes = useMemo(() => {
		// Copy of query data
		const heroesToFilter = heroes.slice();
		// Filtering
		return activeFilter === "all"
			? heroesToFilter
			: heroesToFilter.filter(({ element }) => element === activeFilter);
	}, [heroes, activeFilter]);

	const renderHeroesList = (heroes) => {
		if (heroes.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>;
		}

		return heroes.map(({ id, ...props }) => {
			return <HeroesListItem key={id} id={id} {...props} />;
		});
	};

	const elements = renderHeroesList(filteredHeroes);
	return (
		<>
			{isLoading && <Spinner />}
			{isError && (
				<h5 className="text-center mt-5">Ошибка загрузки: {error}</h5>
			)}
			{isSuccess && <ul>{elements}</ul>}
		</>
	);
};

export default HeroesList;
