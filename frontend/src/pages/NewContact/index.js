import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

export default function NewContact() {
  return (
    <>
      <PageHeader title="Novo contato" />

      <Input type="text" placeholder="Nome" />
      <Select>
        <option>instagram</option>
        <option>Teste</option>
        <option>instagram</option>
        <option>instagram</option>
      </Select>
    </>
  );
}
