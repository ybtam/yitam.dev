import { AboutSection } from '@/app/about/_components/section.tsx'

export const ExtraActivities = () => {
  return (
    <>
      <p>Rock climbing | Cycling | Photography | F1 | Woodworking</p>
      <div>
        <div className={'flex justify-between'}>
          <p>Freewheelers - Volunteer Bike Repair Shop</p>
          <p>2016 - 2020</p>
        </div>
        <p className={'font-semibold'}>Committee Member</p>
        <p>
          Led training workshops for new volunteers, coordinated tasks based on skill levels,
          provided hands-on assistance, and ensured clear communication with volunteers and
          visitors. Also actively engaged visitors during quieter hours, guiding them in bike
          maintenance and care practices.
        </p>
      </div>
    </>
  )
}
