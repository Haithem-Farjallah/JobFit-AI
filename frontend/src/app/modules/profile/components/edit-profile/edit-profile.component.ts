import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  @Output() closeFormEvent = new EventEmitter<void>();
  @Output() submitFormEvent = new EventEmitter<any>();

  formData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone_number: '',
    profilepic: null as File | null, // Add profileImage to form data
  };

  imagePreview: string | ArrayBuffer | null = null; // For displaying the image preview

  onFileChange(event: Event) {
    const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(this.formData.profilepic);
      if (!acceptedTypes.includes(file.type)) {
        alert('Only PNG and JPEG files are allowed');
        return;
      }
      this.formData.profilepic = file;

      // Display image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const formData = new FormData();

    // Append all form data to FormData object
    Object.entries(this.formData).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    this.submitFormEvent.emit(formData); // Emit FormData to parent
    this.onClose(); // Close the form
  }

  onClose() {
    this.closeFormEvent.emit(); // Emit event to close the form
  }
}
