import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Home from './home';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon'; 
configure({ adapter: new Adapter() })


describe('<Home />', () => {
	let home;

	beforeEach(() => home = shallow(<Home />));


	it('renders without crashing', () => {
		expect(home.find('button').length).toEqual(2);
	});

	it('should add a company', () => {
		home.find('.add-company').simulate('click');
		expect(home.find('.company').length).toEqual(2);

		home.find('.add-company').simulate('click');
		expect(home.find('.company').length).toEqual(3);
	});

	it('should update company name', () => {
		home.find('.company-name').simulate('change', {target: {value: 'nike'}});
		expect(home.state('companies')[0].name).toEqual('nike');
	});

	it('should get domain from api', async () => {
		const promise = Promise.resolve({name: 'nike', domain: 'https://www.nike.com'});
		sinon.stub(global, 'fetch', () => promise);

		home.find('.company-name').simulate('change', {target: {value: 'nike'}});
		await home.find('.get-domains').simulate('click');
		console.log(home.state('companies'));
	});
	
});
