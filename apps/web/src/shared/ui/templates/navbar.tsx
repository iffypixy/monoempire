import {Link} from "wouter";
import {cx} from "class-variance-authority";

import {LanguageDropdown} from "@shared/lib/i18n";
import {ThemeDropdown} from "@shared/lib/themes";
import {Icons} from "@shared/ui";

import {Fullscreen} from "./fullscreen";

type NavbarTemplateProps = React.ComponentProps<"div">;

export const NavbarTemplate: React.FC<NavbarTemplateProps> = (props) => (
    <div
        {...props}
        className={cx(
            "flex flex-row bg-paper-secondary px-6 py-4 rounded-xl space-x-4 fixed right-[50%] translate-x-1/2 bottom-10 sm:right-2 sm:bottom-2 shadow-even-lg shadow-paper-secondary z-10",
            props.className,
        )}
    >
        <Link to="/">
            <Icons.Home className="w-14 h-14 rounded-lg p-2 hover:shadow-even-lg hover:shadow-primary bg-primary text-primary-contrast transition duration-500 cursor-pointer hover:-translate-y-2" />
        </Link>

        <LanguageDropdown
            className="hover:-translate-y-2 transition-transform duration-300"
            variant="contained"
            align="start"
        />

        <ThemeDropdown
            className="hover:-translate-y-2 transition-transform duration-300"
            variant="contained"
            align="start"
        />
    </div>
);

type FullscreenWithNavbarProps = React.ComponentProps<typeof Fullscreen>;

export const FullscreenWithNavbar: React.FC<FullscreenWithNavbarProps> = ({
    children,
    ...props
}) => (
    <Fullscreen {...props}>
        <NavbarTemplate />

        {children}
    </Fullscreen>
);
