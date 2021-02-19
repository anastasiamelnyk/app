export default {
  packagesTable: [
    {
      text: 'Basic info',
      value: 'basicInfo',
      sortable: false,
      class: 'py-2 package-list__basic-header',
      cellClass: 'package-list__basic-cell'
    },
    {
      text: 'Description',
      value: 'description',
      sortable: false,
      class: 'py-2 package-list__desc-header',
      cellClass: 'package-list__desc-cell'
    },
    {
      text: 'Created',
      value: 'created',
      align: 'center',
      sortable: false,
      class: 'py-2',
    },
    {
      text: 'Last modified',
      value: 'modified',
      align: 'center',
      sortable: false,
      class: 'py-2',
    },
    {
      text: 'Current version',
      value: 'version',
      align: 'center',
      sortable: false,
      class: 'py-2',
    },
    {
      text: 'Downloads for last month',
      value: 'humanDownloadsLast30Days',
      align: 'center',
      sortable: false,
      class: 'py-2',
    },
  ],
};