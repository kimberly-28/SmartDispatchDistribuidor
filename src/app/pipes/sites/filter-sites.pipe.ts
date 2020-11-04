import { Pipe, PipeTransform } from '@angular/core';
import { SitesStoreDetails } from 'src/app/interfaces/site-store-details';

@Pipe({
  name: 'filterSites'
})
export class FilterSitesPipe implements PipeTransform {

  transform(site: SitesStoreDetails[] , searchTerm: string): SitesStoreDetails[] {
    if (!site || !searchTerm) {
        return site;
    }
    return site.filter(site =>
        site.siteStoreState.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

}
}
