import Avatar from '@mui/material/Avatar';

type ServiceAuthor = {
  name: string;
  role: string;
  avatar: string;
};

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  author: ServiceAuthor;
};

type ServiceCardProps = {
  service: ServiceCard;
};

export default function ServiceCardItem({ service }: ServiceCardProps) {
  return (
    <div className="bg-white  overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="h-72 w-full object-cover  rounded-2xl"
        />
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2  ">
          <Avatar
            alt={service.author.name}
            src={service.author.avatar}
            sx={{ width: 20, height: 20 }}
          />
          <span className="font-bold">{service.author.name}</span>
          <span className="text-gray-400">-</span>
          <span>{service.author.role}</span>
        </div>
        <div>
          <p className="text-sm text-gray-700  font-semibold">
            {service.description}
          </p>
        </div>
        <div className=" text-sm font-semibold text-gray-900">
          {service.price}
        </div>
      </div>
    </div>
  );
}
