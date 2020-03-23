import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuerySearch} from '../../interfaces/querySearch';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Output() prev: EventEmitter<QuerySearch> = new EventEmitter<QuerySearch>();
  @Output() next: EventEmitter<QuerySearch> = new EventEmitter<QuerySearch>();
  @Output() first: EventEmitter<QuerySearch> = new EventEmitter<QuerySearch>();
  @Output() last: EventEmitter<QuerySearch> = new EventEmitter<QuerySearch>();
  @Output() goPage: EventEmitter<QuerySearch> = new EventEmitter<QuerySearch>();

  @Input() count: number;
  @Input() query: QuerySearch;
  allPage = [];
  part = [];
  start = 0;
  end = 5;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // @ts-ignore
    this.route.queryParamMap.pipe(map(value => value.params)).subscribe(
      query => {
          this.query = JSON.parse(JSON.stringify(query));
          this.paginationCounter();
      });
  }


  paginationCounter() {
    if (this.query.limit > 0) {
      // @ts-ignore
      this.allPage = Array( Math.ceil(this.count / this.query.limit)).fill().map((x, i) => i);
      this.part = this.allPage.slice(this.start, this.end);
      if (this.query.page > this.allPage.length - 1) {
        this.query.page = this.allPage.length - 1;
        this.goPage.emit( this.query);
      }
    }


  }

  goFirst() {
    this.query.page = 0;
    this.start = 0;
    this.end = 5;
    this.first.emit(this.query);
  }

  goPrev() {
    this.query.page = --this.query.page;
    if (this.query.page < 1) {
      this.query.page = 0;
    }
    this.checkLast(this.query);
    this.prev.emit(this.query);
  }

  goNext() {
    this.query.page = ++this.query.page;
    if (this.query.page > this.allPage.length - 1) {
      this.query.page = this.allPage.length - 1;
    }
    this.checkNext(this.query);
    this.next.emit(this.query);
  }

  goLast() {
    this.query.page = this.allPage.length - 1;
    this.start = this.allPage.length - 5;
    this.end = this.allPage.length;
    this.last.emit(this.query);
  }

  selectPage(page: any) {
    this.query.page = page;
    this.checkLast(this.query);
    this.checkNext(this.query);
    this.goPage.emit(this.query);
  }

  checkNext(query) {
    if (query.page > this.part[Math.ceil(this.part.length / 2)]) {
      this.start = this.start < this.allPage.length - 5 ?  ++this.start : this.allPage.length - 5;
      this.end = this.end < this.allPage.length ? ++this.end : this.end;
    }
  }
  checkLast(query) {
    if (query.page < this.part[Math.ceil(this.part.length / 2)]) {
      this.start = this.start > 0 ? --this.start : this.start = 0;
      this.end = this.end > 5 ? --this.end : this.end = 5;
    }
  }
}

