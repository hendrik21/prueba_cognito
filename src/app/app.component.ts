import { Component, OnInit } from '@angular/core';
import { Amplify, Analytics, Auth } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public user: any;

  ngOnInit() {
    this.user = Auth.currentAuthenticatedUser()
  }

  eventoRastreado() {
    console.log('Este evento será rastreado')
  }

  async rastrearEvento() {
    Analytics.updateEndpoint({
      address: 'hendriklop2106@hotmail.com', // The unique identifier for the recipient. For example, an address could be a device token, email address, or mobile phone number.
      attributes: {
        // Custom attributes that your app reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create a segment.
        hobbies: ['piano', 'hiking']
      },
      channelType: 'APNS', // The channel type. Valid values: APNS, GCM
      demographic: {
        appVersion: 'demo', // The version of the application associated with the endpoint.
        locale: 'Colombia', // The endpoint locale in the following format: The ISO 639-1 alpha-2 code, followed by an underscore, followed by an ISO 3166-1 alpha-2 value
        make: 'Lenovo', // The manufacturer of the endpoint device, such as Apple or Samsung.
        model: 'Ideapad 320', // The model name or number of the endpoint device, such as iPhone.
        platform: 'Ubuntu', // The platform of the endpoint device, such as iOS or Android.
        platformVersion: '20', // The platform version of the endpoint device.
      },
      location: {
        city: 'Bucaramanga', // The city where the endpoint is located.
        country: 'CO', // The two-letter code for the country or region of the endpoint. Specified as an ISO 3166-1 alpha-2 code, such as "US" for the United States.
        latitude: 0, // The latitude of the endpoint location, rounded to one decimal place.
        longitude: 0, // The longitude of the endpoint location, rounded to one decimal place.
        postalCode: 'xxxxxx', // The postal code or zip code of the endpoint.
        region: 'Santander' // The region of the endpoint location. For example, in the United States, this corresponds to a state.
      },
      metrics: {
        // Custom metrics that your app reports to Amazon Pinpoint.
      },
      optOut: 'ALL',
      // Customized userId
      userId: this.user.username,
      // User attributes
      userAttributes: {
        interests: ['football', 'basketball', 'AWS']
        // ...
      }
    }).then(() => {});
    let rastreador =  await Analytics.record({name: 'eventoRastreado', immediate: true})
    console.log(rastreador);
  }

}
