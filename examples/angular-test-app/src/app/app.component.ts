import { Component, OnInit } from '@angular/core';
import { Client } from 'zengenti-contensis-delivery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular-test-app';
  contensisProjectName = '';

  ngOnInit(): void {
    const client = Client.create({
      accessToken: 'xxxxx',
      projectId: 'website',
      rootUrl: 'https://cms-example.cloud.contensis.com'
    });
    client.project.get().then(project => {
      this.contensisProjectName = project.name;
    });
  }

}
