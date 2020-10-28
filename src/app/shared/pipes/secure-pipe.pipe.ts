import { Pipe, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Pipe({
  name: "secure",
})
export class SecurePipe implements PipeTransform {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  transform(url): Promise<SafeUrl> {
    let transformedUrl = this.http
      .get(url, { responseType: "blob" })
      .toPromise()
      .then((res) => res["text"]());
    // .then((base64text) => {
    //   console.log(base64text);
    //   return this.sanitizer.bypassSecurityTrustUrl(
    //     URL.createObjectURL(base64text)
    //   );
    // });
    // transformedUrl.then((text) => console.log(text));

    return transformedUrl;
  }
}
