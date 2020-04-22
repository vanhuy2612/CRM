import React from 'react';
import Slider from 'react-animated-slider';
// import horizontalCss from '../../css/horizontal.css';
import 'react-animated-slider/build/horizontal.css';
import content from './content';
// cần chỉnh sửa lại ảnh ở slide
function Autoplay() {
	return (
		<div>
			<Slider  autoplay={3000}>
				{content.map((item, index) => (
					<div
						key={index}

						style={{ background: `url('${item.image}') no-repeat center center` }}
					>
						<div className="center">
							<h1>{item.title}</h1>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
}

export default Autoplay;