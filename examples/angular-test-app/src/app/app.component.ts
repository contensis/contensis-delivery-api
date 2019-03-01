import { Component, OnInit } from '@angular/core';
import { Client } from 'contensis-delivery-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular-test-app';
  contensisProjectName = '';
  error = null;

  ngOnInit(): void {
    const client = Client.create({
      accessToken: 'xxxxx',
      projectId: 'website',
      rootUrl: 'https://cms-example.cloud.contensis.com'
    });
    client.project.get().then(project => {
      this.contensisProjectName = project.name;
    },
      error => {
        this.error = error;
      }
    );
  }

}
