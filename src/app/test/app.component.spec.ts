import { async } from '@angular/core/testing';
import { Fixture } from './app.component.fixture';

describe('component: app', () => {
    beforeEach(() => {
        this.fixture = new Fixture().testBedFixture;
        this.component = this.fixture.componentInstance;
    });

    it('should create the app', async(() => {
        expect(this.component).toBeTruthy();
    }));

    it(`should have as title 'app works!'`, async(() => {
        expect(this.component.title).toEqual('gaff app');
    }));
});
