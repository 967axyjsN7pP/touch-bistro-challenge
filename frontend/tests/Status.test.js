import React from 'react';
import Status from '../src/Status.jsx';
import renderer from 'react-test-renderer';

test('it renders the fetching message when isFetching prop is true', () => {
    const component = renderer.create(
        <Status
            isFetching={true}
        />
    );
    expect(component.toJSON()).toMatchSnapshot()
});

test('it renders the error message when errorMessage prop is non-empty', () => {
    const component = renderer.create(
        <Status errorMessage="Something went wrong." />
    );
    expect(component.toJSON()).toMatchSnapshot();
});

test('it renders the singular-form of the success message when medianPrimes prop has a single element', () => {
    const component = renderer.create(
        <Status
            limit={18}
            medianPrimes={[7]}
        />
    );
    expect(component.toJSON()).toMatchSnapshot();
});

test('it renders the plural-form of the success message when medianPrimes prop has two elements', () => {
    const component = renderer.create(
        <Status
            limit={10}
            medianPrimes={[3, 5]}
        />
    );
    expect(component.toJSON()).toMatchSnapshot();
})
