using my.skillmap as my from '../db/schema';

service CatalogService {
    entity EAs as projection on my.EAs;
    entity Skills as projection on my.Skills;

    annotate Customers with @odata.draft.enabled;
    entity Customers as projection on my.Customers;
    entity Experience as projection on my.Experience;
}
