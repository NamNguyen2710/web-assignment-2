import distributionHub from './distributionHub.mongo.js';

async function loadDistributionHubData() {
  const data = [
    {
      id: 1,
      name: 'Ho Chi Minh City',
      address: '456 Le Loi Street, District 3, Ho Chi Minh City'
    },
    {
      id: 2,
      name: 'Da Nang',
      address: '987 Le Duan, Hai Chau District, Da Nang'
    },
    {
      id: 3,
      name: 'Ha Noi',
      address: '890 Nguyen Trai, Thanh Xuan District, Ha Noi'
    }
  ];

  return Promise.all(
    data.map(hub =>
      distributionHub.findOneAndUpdate({ id: hub.id }, hub, {
        upsert: true,
        returnDocument: 'after',
        projection: { _id: 0, __v: 0 }
      })
    )
  );
}

async function readAllDistributionHub() {
  return distributionHub.find({}, { _id: 0, __v: 0 }).sort({ id: 1 });
}

export { loadDistributionHubData, readAllDistributionHub };
