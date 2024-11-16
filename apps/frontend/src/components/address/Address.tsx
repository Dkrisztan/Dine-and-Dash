export default function Adresses({ addresses }: { addresses: string[] }) {
  return (
    <div>
      {addresses.map((address) => (
        <div key={address}>{address}</div>
      ))}
    </div>
  );
}
