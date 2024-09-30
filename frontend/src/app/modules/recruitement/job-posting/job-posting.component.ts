import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from '@core/services/job.service';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrl: './job-posting.component.css',
})
export class JobPostingComponent {
  content = '';
  postJobForm!: FormGroup;
  minDate: Date = new Date();
  constructor(private jobService: JobService) {}
  ngOnInit() {
    this.postJobForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      min_salary: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        this.controlSalary.bind(this),
      ]),
      max_salary: new FormControl(0, [
        Validators.required,
        this.controlSalary.bind(this),
      ]),
      experience_level: new FormControl('', [Validators.required]),
      work_type: new FormControl('', [Validators.required]),
      expiration_date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  controlSalary() {
    const minSalary = this.postJobForm?.get('min_salary')?.value;
    const maxSalary = this.postJobForm?.get('max_salary')?.value;
    if (minSalary > maxSalary && maxSalary !== 0 && minSalary !== 0) {
      return { invalidSalary: true };
    }
    return null;
  }

  // Define the toolbar configuration
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ size: ['small', false, 'large', 'huge'] }], // Add custom sizes
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      [{ align: [] }], // Text alignment
      [{ color: [] }, { background: [] }], // Text color
    ],
  };
  postJob() {
    console.log(this.content);
  }
  onSubmit() {
    console.log(this.postJobForm.value);
    this.jobService.postJob(this.postJobForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
