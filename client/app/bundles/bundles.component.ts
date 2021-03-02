import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BundleService } from '../services/bundle.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Bundle } from '../shared/models/bundle.model';

@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.scss']
})
export class BundlesComponent implements OnInit {

  bundle = new Bundle();
  bundles: Bundle[] = [];
  isLoading = true;
  isEditing = false;

  addBundleForm: FormGroup;
  name = new FormControl('', Validators.required);
  bundleTitle = new FormControl('', Validators.required);
  img = new FormControl('', Validators.required);
  active = false;
  value = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);

  constructor(private bundleService: BundleService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getBundles();
    this.addBundleForm = this.formBuilder.group({
      name: this.name,
      bundleTitle: this.bundleTitle,
      img: this.img,
      active: this.active,
      value: this.value,
      date: this.date
    });
  }

  getBundles() {
    this.bundleService.getBundles().subscribe(
      data => this.bundles = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBundle() {
    this.bundleService.addBundle(this.addBundleForm.value).subscribe(
      res => {
        this.bundles.push(res);
        this.addBundleForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(bundle: Bundle) {
    this.isEditing = true;
    this.bundle = bundle;
  }

  cancelEditing() {
    this.isEditing = false;
    this.bundle = new Bundle();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the bundles to reset the editing
    this.getBundles();
  }

  editBundle(bundle: Bundle) {
    this.bundleService.editBundle(bundle).subscribe(
      () => {
        this.isEditing = false;
        this.bundle = bundle;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBundle(bundle: Bundle) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.bundleService.deleteBundle(bundle).subscribe(
        () => {
          const pos = this.bundles.map(elem => elem._id).indexOf(bundle._id);
          this.bundles.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
