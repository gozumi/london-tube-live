/* tslint:disable:no-unused-variable */

import { async } from '@angular/core/testing';
import { Fixture } from './overview.fixture';

describe('component: overview', () => {
    beforeEach(() => {
        this.fixture = new Fixture().testBedFixture;
        this.component = this.fixture.componentInstance;
    });

    it('should create the app', async(() => {
        expect(this.component).toBeTruthy();
    }));
});
