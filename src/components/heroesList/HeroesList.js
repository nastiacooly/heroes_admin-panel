import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { fetchHeroes } from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
	const heroesLoadingStatus = useSelector(
		(state) => state.heroes.heroesLoadingStatus
	);

	// Мемоизирует значения стейта и не вызывает перерендер, если указанные части стейта не менялись
	const filteredHeroesSelector = createSelector(
		(state) => state.filters.activeFilter,
		(state) => state.heroes.heroes,
		(activeFilter, heroes) => {
			return activeFilter === "all"
				? heroes
				: heroes.filter(({ element }) => element === activeFilter);
		}
	);

	const filteredHeroes = useSelector(filteredHeroesSelector);

	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(fetchHeroes(request));
		// eslint-disable-next-line
	}, []);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderHeroesList = (heroes) => {
		if (heroes.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>;
		}

		return heroes.map(({ id, ...props }) => {
			return <HeroesListItem key={id} id={id} {...props} />;
		});
	};

	const elements = renderHeroesList(filteredHeroes);
	return <ul>{elements}</ul>;
};

export default HeroesList;
