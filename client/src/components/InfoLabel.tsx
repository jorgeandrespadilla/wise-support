type InfoLabelProps = {
  label: string;
  value: string;
};

function InfoLabel({
  label,
  value,
}: InfoLabelProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <label className="font-medium text-gray-900">{value}</label>
    </div>
  );
}

export default InfoLabel;