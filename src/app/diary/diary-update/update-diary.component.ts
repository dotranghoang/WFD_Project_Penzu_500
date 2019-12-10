import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenStorageService} from '../../auth/token-storage.service';
import {DiaryService} from '../../services/diary.service';
import {Diary} from '../../model/diary';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../model/tag';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update-diary',
  templateUrl: './update-diary.component.html',
  styleUrls: ['./update-diary.component.scss']
})
export class UpdateDiaryComponent implements OnInit {
  idParam: any;
  diary: Diary;
  tagList: Tag[];
  info: any;
  previewId: string;
  tagId = '';
  fileUpload: File;
  filePath: any;
  processValue = 0;
  counting: any;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private diaryService: DiaryService,
              private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params.id;
    });
  }

  ngOnInit() {
    this.diaryService.findDiaryById(this.idParam).subscribe(
      result => {
        this.diary = result;
        console.log(this.diary);
      }, error => {
        console.log(error);
      }
    );

    this.tagService.getTagList().subscribe(
    result => {
      this.tagList = result;
      }, error => {
      console.log(error);
      }
    );

    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getEmail()
    };
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = ( event ) => {
      this.filePath = reader.result;
    };
    console.log(this.filePath);
  }

    updateDiary(openModal: HTMLButtonElement, openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {

    if (this.diary.title === '' || this.diary.description === '' || this.diary.content === '') {
      return alert('Fill Data Fields !');
    }

    if (this.fileUpload !== null && this.fileUpload !== undefined ) {
      this.counting = setInterval(() => {
        this.processValue += 11;
        if (this.processValue === 99) {
          clearInterval(this.counting);
        }
      }, 1000);
      openProcessBar.click();
    }

    if (this.tagId === '') {
      this.tagId = this.diary.tag.id;
    }

    const diary: Diary = {
      id: this.diary.id,
      title: this.diary.title,
      description: this.diary.description,
      content: this.diary.content,
      user: {
        id: this.info.userId
      },
      tag: {
        id: this.tagId
      }
    };

    this.diaryService.updateDiary(diary).subscribe(
      result => {
        if (this.fileUpload === null || this.fileUpload === undefined ) {
          console.log('create diary ok');
          openModal.click();
          this.previewId = result.id;
        } else {
          const form = new FormData();
          form.append('file', this.fileUpload);
          this.diaryService.uploadFile(form, result.id).subscribe(
            next => {
              clearInterval(this.counting);
              this.processValue = 100;

              setTimeout(() => {
                closeProcess.click();
                console.log('upload file ok');
                openModal.click();
                this.previewId = result.id;
              }, 3000);

            }, error1 => {
              console.log('loi upload file');
            }
          );
        }
      }, error5 => {
        return console.log('fail create diary');
      }
    );
  }

  preview(previewId: any, closeModalRef1: HTMLButtonElement) {
    closeModalRef1.click();
    return this.router.navigateByUrl('/diary/' + previewId);
  }

}
