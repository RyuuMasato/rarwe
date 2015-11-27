export default function() {
  this.transition(
    this.fromRoute('bands.band.details'),
    this.fromRoute('bands.band.loading'),
    this.toRoute('bands.band.songs'),
    this.toRoute('bands.band.loading'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.hasClass('band-description'),
    this.toValue(false),
    this.use('fade', { duration: 500 }),
    this.reverse('fade', { duration: 500 })
  );
  this.transition(
    this.inHelper('liquid-bind'),
    this.use('slight-scale')
  );
}
