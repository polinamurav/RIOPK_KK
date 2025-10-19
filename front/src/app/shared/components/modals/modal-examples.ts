// constructor(private dialog: MatDialog) {}
// openClientDialog() {
//   const dialogRef = this.dialog.open(UserModalComponent, {
//     height: 'calc(100% - 121px)',
//     width: '800px',
//     // required class set parent block position relative
//     panelClass: 'custom-panel-cls',
//     data: {
//       showAdminModal: false,
//       clientData: {
//         clientInfo: {
//           lastName: {
//             placeholder: 'Фамилия',
//             typeField: 'text',
//             value: 'Иванов'
//           },
//           name: {
//             placeholder: 'Имя',
//             typeField: 'text',
//             value: 'Иван'
//           },
//           patronymic: {
//             placeholder: 'Отчество',
//             typeField: 'text',
//             value: 'Иванович'
//           },
//           email: {
//             placeholder: 'Адрес электронной почты',
//             typeField: 'email',
//             value: 'ivan@mail.ru'
//           },
//           telephone: {
//             placeholder: 'Телефон',
//             typeField: 'phoneNumber',
//             value: '+375292833333'
//           }
//         },
//         roles: ['Administrator', 'Credit manager']
//       }
//     }
//   });
//   dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe((val) => {
//     console.log(val);
//   })
// }
//
// openReportDialog() {
//   const dialogRef = this.dialog.open(ReportModalComponent, {
//     height: '440px',
//     width: '550px',
//     // required class set parent block position relative
//     panelClass: 'custom-panel-cls',
//     data: {
//       title: 'Failure causes report with approval level'
//     }
//   });
//
//   dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe((val) => {
//     console.log(val);
//   })
// }
//
// openChooseOptionsDialog() {
//   this.dialog.open(ChooseOptionsModalComponent, {
//     height: '547px',
//     width: '824px',
//     // required class set parent block position relative
//     panelClass: 'custom-panel-cls'
//   });
// }
//
// openConfirmDialog() {
//   const dialogRef = this.dialog.open(ConfirmModalComponent, {
//     height: '187px',
//     width: '450px',
//     data: {
//       title: 'Одобрить заявку?'
//     },
//     // required class set parent block position relative
//     panelClass: 'custom-panel-cls'
//   });
//
//   dialogRef.afterClosed().subscribe(result => {
//     console.log(`Dialog result: ${result}`);
//   });
// }
//
// openDeactivateProductDialog() {
//   const dialogRef = this.dialog.open(DeactivateProductModalComponent, {
//     height: '170px',
//     width: '460px',
//     // required class set parent block position relative
//     panelClass: 'custom-panel-cls'
//   });
//   dialogRef.afterClosed().subscribe(result => {
//     console.log(`Dialog result: ${result}`);
//   });
// }
