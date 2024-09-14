interface iAppProps {
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "Bicycle",
    description: "This Property is close to the Beach.",
    title: "Bicycle",
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/004/791/314/original/simple-bicycle-icon-free-vector.jpg",
  },
  {
    id: 1,
    name: "Car",
    description: "This is a Property which is trending.",
    title: "Car",
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/008/561/510/original/simple-icon-modern-sign-car-silhouette-on-background-front-view-car-icon-vehicle-inspiration-editable-eps10-free-vector.jpg",
  },
  {
    id: 2,
    name: "Bike",
    description: "This is a Property is close to the beachfront",
    title: "Bike",
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/007/627/564/original/black-motorcycle-silhouette-icon-motor-bike-transport-glyph-pictogram-sport-motorbike-icon-motorcycle-scooter-motorbike-chopper-sign-moto-cycle-symbol-isolated-illustration-vector.jpg",
  },
  {
    id: 3,
    name: "Scooty",
    description: "This Property is considerd a Earth Home",
    title: "Scooty",
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/017/091/370/original/scooter-icon-vector.jpg",
  },
];