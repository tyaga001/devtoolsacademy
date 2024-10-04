import Image from 'next/image'

export function ProductHuntBadge() {
    return (
        <a
            href="https://www.producthunt.com/posts/dev-tools-academy?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dev&#0045;tools&#0045;academy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
        >
            <Image
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=493913&theme=light"
                alt="Dev Tools Academy - A special blog made for Developers. | Product Hunt"
                width={250}
                height={54}
                className="w-[250px] h-[54px]"
            />
        </a>
    )
}