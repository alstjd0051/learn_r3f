1. 위치 변환(Transformations):

   - `position` 프로퍼티를 사용하여 3D 객체의 위치를 조정할 수 있습니다.
   - 예를 들어, `position={[x, y, z]}`와 같은 방식으로 사용하여 객체를 이동할 수 있습니다.

2. 회전 변환(Rotations):

   - `rotation` 프로퍼티를 사용하여 3D 객체를 회전시킬 수 있습니다.
   - 각 값은 라디안 단위로 지정됩니다. 예를 들어, `rotation={[Math.PI / 2, 0, 0]}`는 x축을 기준으로 90도 회전시킵니다.

3. 크기 변환(Scaling):
   - `scale` 프로퍼티를 사용하여 3D 객체의 크기를 조절할 수 있습니다.
   - 각 값은 크기 비율을 나타내며, 예를 들어, `scale={[2, 2, 2]}`는 객체의 크기를 2배로 확대시킵니다.