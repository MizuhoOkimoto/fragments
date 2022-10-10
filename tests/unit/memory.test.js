const {
  listFragments,
  writeFragment,
  readFragment,
  writeFragmentData,
  readFragmentData,
} = require('../../src/model/data/memory/index');

describe('in-memory databases', () => {
  test('writeFragment()', async () => {
    const fragment = {
      id: 'id',
      ownerId: '1234',
      type: 'text/plain',
      size: 1,
    };
    await writeFragment(fragment);
    const result = await readFragment(fragment.ownerId, fragment.id, fragment);
    expect(result).toEqual(fragment);
  });

  test('readFragment()', async () => {
    const fragment = {
      id: 'id',
      ownerId: '1234',
      type: 'text/plain',
      size: 1,
    };
    const result = await readFragment('1234', 'id');
    expect(result).toEqual(fragment);
  });

  // The Buffer. from() method creates a new buffer filled
  // with the specified string, array, or buffer.

  test('writeFragmentData() works with string buffer', async () => {
    const bufferWithString = Buffer.from('string', 'utf-8');
    expect(async () => await writeFragmentData('a', 'b', bufferWithString)).not.toThrow();
  });

  test('writeFragmentData() works with array buffer', async () => {
    const bufferRaw = Buffer.from([1, 2, 3]);
    expect(async () => await writeFragmentData('a', 'b', bufferRaw)).not.toThrow();
  });

  test('readFragmentData() ', async () => {
    expect(async () => await readFragmentData('a', 'b')).not.toThrow();
    expect(async () => await readFragmentData('empty fragment')).rejects.toThrow();
  });

  test('listFragments() returns an array', async () => {
    const list = await listFragments('a', 'b');
    const list2 = await listFragments('empty');
    expect.arrayContaining(list);
    expect(list2).toEqual([]);
  });

  // test('deleteFragment() ', async () => {
  //   const fragment = {
  //     id: 'id',
  //     ownerId: '1234',
  //     type: 'text/plain',
  //     size: 1,
  //   };
  //   await writeFragment(fragment);
  //   //await readFragment('1234', 'id');
  //   //console.log(readFragment('1234', 'id'));
  //   //const del = await deleteFragment([fragment.ownerId],[fragment.id]);
  //   const del = await deleteFragment(['1234'],['id']);
  //   expect(del).toEqual(fragment);
  // });
});
