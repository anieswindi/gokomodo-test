import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient, formatDate } from '../../src/utils/Helpers';
import Default from '../../src/assets/image/default-movie.png';

function ComicDetails(props) {
	const { id } = useParams();
	const [title, setTitle] = useState('');
	const [data, setData] = useState(null);
	const [publised, setPublished] = useState(null);
	const [creators, setCreators] = useState(null);

	useEffect(() => {
		getComicDetails();
	}, [id]);

	const getComicDetails = async () => {
		try {
			const response = await apiClient('get', 'comics/' + id);

			if (response.code === 200) {
				setData(response.payload.results[0]);
				setTitle(response.payload.results[0]?.title);

				const publish = response.payload.results[0].dates.find((x) => x.type === 'focDate')?.date;
				const createdBy = response.payload.results[0].creators.items;

				setPublished(publish);
				setCreators(createdBy);
			}
		} catch (err) {
			throw err
		}
	};

	document.title = title || 'Comic Details';
	return (
		<div className='container comic-details'>
			<div className='content'>
				<div className='back'>
					<a href='/'>
						<i className='arrow left'></i>
						<span>Back</span>
					</a>
				</div>
				<div className='info'>
					<div className='wrap-image skeleton-image'>
						<img src={data && data.thumbnail ? data.thumbnail.path + '.' + data.thumbnail.extension : Default} alt='ImgDetails' />
					</div>
					<div className='wrap-description'>
						<h1>{data && data.title}</h1>

						<div className='meta'>
							<div>
								<strong>Published:</strong>
							</div>

							<div>{formatDate(publised)}</div>

							<ul>
								{creators &&
									creators
										.filter((x) => ['writer', 'editor', 'penciler (cover)'].includes(x.role))
										.map((creator) => (
											<li key={'Creator-' + creator.role}>
												{
													{
														editor: (
															<>
																<div>
																	<strong>Editor:</strong>
																</div>
																<div>
																	<span>{creator.name}</span>
																</div>
															</>
														),
														'penciler (cover)': (
															<>
																<div>
																	<strong>Penciler:</strong>
																</div>
																<div>
																	<span>{creator.name}</span>
																</div>
															</>
														),
														writer: (
															<>
																<div>
																	<strong>Writer:</strong>
																</div>
																<div>
																	<span>{creator.name}</span>
																</div>
															</>
														),
													}[creator.role]
												}
											</li>
										))}
							</ul>
						</div>
						<div className='detail'>
							<div>
								<strong>Description:</strong>
							</div>
							<p>{data && data.description}</p>
						</div>
						<div className='other'></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ComicDetails;
