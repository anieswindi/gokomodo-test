import React, { useState, useEffect } from 'react';
import { LoaderEllipsis, Paginate } from '../components';
import { apiClient } from '../../src/utils/Helpers';
import Default from '../../src/assets/image/default-movie.png';

let PageSize = 10;
let Param = {
	limit: 100,
	dateRange: '2018-01-01,2019-01-02',
};

function Home(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setLoading] = useState(false);
	const [comics, setComics] = useState([]);

	const firstPageIndex = (currentPage - 1) * PageSize;
	const lastPageIndex = firstPageIndex + PageSize;

	useEffect(() => {
		getComics();
	}, []);

	const getComics = async () => {
		try {
			setLoading(true);
			const response = await apiClient('get', 'comics', Param);

			if (response.code === 200) {
				setComics(response.payload.results);
			}

			setTimeout(() => {
				setLoading(false);
			}, 1000);
		} catch (err) {
			throw err
			setLoading(false);
		}
	};

	document.title = 'Comics Marvel';

	return (
		<div className='container home'>
			<h1>Comics Marvel</h1>
			<div className='wrap list'>
				{comics && comics.length > 0
					? comics.slice(firstPageIndex, lastPageIndex).map((comic) => (
							<a key={'comic-' + comic.id} id={'comic-' + comic.id} className='content' href={'/' + comic.id}>
								<div className='picture skeleton-image'>
									<img src={comic.thumbnail && comic.thumbnail.path ? comic.thumbnail.path + '.' + comic.thumbnail.extension : Default} alt={'Image-' + comic.id} />
								</div>

								<div className='details'>
									<h2>{comic.title}</h2>

									<span></span>
								</div>
							</a>
					  ))
					: isLoading && (
							<div>
								<LoaderEllipsis />
							</div>
					  )}
			</div>

			<div className='wrap paginate'>
				<Paginate className='pagination-bar' currentPage={currentPage} totalCount={comics.length} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
			</div>
		</div>
	);
}

export default Home;
