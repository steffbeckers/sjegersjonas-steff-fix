import {
  AfterContentInit,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, NgControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {SearchParam} from "../../infrastructure/queries/filter/search-param";
import {SubSink} from "subsink";
import {StringHelper} from "../../helpers/string.helper";

@Directive({
    selector: '[selectSearchRef]',
    host: {
        '[style.display]': '"none"'
    },
    standalone: false
})
export class SelectSearchRefDirective {

  constructor(public control: NgControl) {}

  setValue(value: any) {
    this.control.control?.setValue(value);
  }
}

@Component({
    selector: 'app-select-search[data][bindLabel][bindValue]',
    templateUrl: './select-search.component.html',
    styleUrls: ['./select-search.component.scss'],
    standalone: false
})
export class SelectSearchComponent implements OnInit, AfterContentInit, OnDestroy {
  @ContentChild(SelectSearchRefDirective) contentChild!: SelectSearchRefDirective;
  @Input() data!: any;
  @Input() bindLabel!: string;
  @Input() bindValue!: string;
  @Output() search: EventEmitter<SearchParam> = new EventEmitter();
  @Input() clearable: boolean = true;

  private subs = new SubSink();

  form = this.fb.group({
    selectedId: [null],
    filterText: [''],
  });

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.addFilterTextControlListener();
    this.addSelectedIdControlListener();
  }

  onClear() {
    this.selectedIdControl = null;
  }

  ngAfterContentInit(): void {
    const value = (StringHelper.isEmptyOrNull(this.contentChild.control.value)) ? null : this.contentChild.control.value;
    this.selectedIdControl = value;
    this.search.emit({ searchText: this.filterTextControl.value, id: value });
    this.addContentChildControlListener();
  }

  private addFilterTextControlListener() {
    this.subs.sink = this.filterTextControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.search.emit({ searchText: value });
    });
  }

  private addSelectedIdControlListener() {
    this.subs.sink = this.selectedIdControl.valueChanges.pipe(distinctUntilChanged()).subscribe((selectedId: string) => {
      if(selectedId !== this.contentChild.control.value) {
        this.contentChild.setValue(selectedId);
      }
    });
  }

  private addContentChildControlListener() {
    this.contentChild.control.valueChanges?.pipe(distinctUntilChanged()).subscribe((id: string) => {
      const newId = (StringHelper.isEmptyOrNull(id)) ? null : id;
      if(newId !== this.selectedIdControl.value) {
        this.selectedIdControl = newId;
        this.search.emit({ searchText: this.filterTextControl.value, id: newId});
      }
    });
  }

  get selectedIdControl(): UntypedFormControl {
    return this.form.get('selectedId') as UntypedFormControl;
  }

  set selectedIdControl(id: any) {
    this.form.patchValue({ selectedId: id });
  }

  get filterTextControl(): UntypedFormControl {
    return this.form.get('filterText') as UntypedFormControl;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
