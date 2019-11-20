import { Component, OnInit } from '@angular/core';
import {TagService} from '../services/tag.service';
import {Tag} from '../services/tag';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-view-all-tag',
  templateUrl: './view-all-tag.component.html',
  styleUrls: ['./view-all-tag.component.scss']
})
export class ViewAllTagComponent implements OnInit {
  tagList: Tag[] = [];
  constructor(private tagService: TagService) { }

  tagForm = new FormGroup({
    name: new FormControl('')
  });

  id: any;

  ngOnInit() {
   this.getListTag();
  }

  getListTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getId(id: any) {
    this.id = id;
    console.log(this.id);
  }

  editTag(closeButton: HTMLInputElement) {
    const {name} = this.tagForm.value;
    const tag: Tag = {
      id: this.id,
      name
    };

    this.tagService.editTag(tag).subscribe(
      result => {
        console.log('ok');
        closeButton.click();
        this.getListTag();
      }, error => {
        console.log('loi');
      }
    );
  }

  deleteTag(closeButton: HTMLInputElement){
    this.tagService.deleteTag(this.id).subscribe(
      result => {
        console.log('ok');
        closeButton.click();
        this.getListTag();
      }, error => {
        console.log('fail');
      }
    );
  }

  createTag(closeButton: HTMLInputElement){
    const {name} = this.tagForm.value;
    const tag: Tag = {
      name
    };
    this.tagService.createTag(tag).subscribe(
      result => {
        console.log('ok');
        closeButton.click();
        this.getListTag();
      }, error => {
        console.log('fail');
      }
    );
  }

}
