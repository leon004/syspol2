import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { FirebaseStorageService } from './firebase-storage.service';

const firebaseConfig = {
  apiKey: "AIzaSyAastVsls81QPPB0N--vU0bM0-NjMrB9lo",
  authDomain: "syspol-storage.firebaseapp.com",
  projectId: "syspol-storage",
  storageBucket: "syspol-storage.appspot.com",
  messagingSenderId: "711653640080",
  appId: "1:711653640080:web:36511ae6940ad6fd5b5515"
};

describe('FirebaseStorageService', () => {
  let service: FirebaseStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireStorageModule
      ],
      providers: [FirebaseStorageService]
    });
    service = TestBed.inject(FirebaseStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
