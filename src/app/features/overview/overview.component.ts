import {
    Component,
    OnInit,
    OnChanges,
    AfterViewInit,
    ElementRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { select as d3Select, Selection } from 'd3-selection';
import 'd3-transition';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { json as d3Json } from 'd3-request';
import { Journey } from '../../data/models/journey.interface';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class OverviewComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('svgContainer') svgElement: ElementRef;

    private yScale: ScaleLinear<number, number>;
    private width: number;
    private height: number;
    private margin;
    private journeyVisualisation: Selection<any, {}, null, undefined>;

    constructor() { }

    ngOnInit() {
        this.margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 40
        };

        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;

        this.yScale = scaleLinear()
            .range([this.height, 0]);

        this.journeyVisualisation = d3Select(this.svgElement.nativeElement)
            // .attr('width', this.width + this.margin.left + this.margin.right)
            // .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    }

    /**
     * Trigger the rendering of the chart once the view has initialised
     */
    ngAfterViewInit() {
        d3Json('data/data.json', this.renderChart.bind(this));
    }

    ngOnChanges(): void { }

    private type(d) {
        d.value = +d.value;
        return d;
    }

    /**
     * Render the chart
     */
    private renderChart(error, data: Journey) {
        let circle = this.journeyVisualisation.selectAll('circle')
            .data(data.next)
            .enter()
            .append('circle');

        circle
            .attr('id', (d, index, allBubbles) => {
                return 10;
            })
            .attr('cx', d => d.x_axis)
            .attr('cy', d => d.y_axis)
            .attr('r', d => d.radius)
            .style('fill', d => d.color)
            .attr('class', 'bubble');

        circle.on('click', this.moveCircles.bind(this));
    }

    private moveCircles(bubble, index, allBubbles) {

        this.journeyVisualisation.selectAll('circle')
            .transition()
            .duration(2000)
            .attr('r', 40);
    }
}
